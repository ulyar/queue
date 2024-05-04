from fastapi import FastAPI
from fastapi.responses import StreamingResponse, JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn
from ultralytics import YOLO
import cv2
from pathlib import Path
from openai import OpenAI
from datetime import datetime
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

client = OpenAI(api_key='')

model = YOLO('best.pt')

video_path = 'rtsp://admin:DOS_OPERATOR24@10.23.49.10:554'
video_path2 = 'static/image/file1.mp4'

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueueWorker:
    def __init__(self):
        self.frame_now = 0

        self.loads = 0
        self.people_in_queue = 0
        self.people_total = 0
        self.loads_queue = 0
        self.people_sit = 0

        self.ready_to_get = False

    def async_frame_generator1(self):
        cap = cv2.VideoCapture(video_path)
        while cap.isOpened():
            self.people_sit = 0
            self.people_in_queue = 0

            self.ready_to_get = False

            success, frame = cap.read()
            if success:
                results = model(frame, stream=True, verbose=False)

                for r in results:
                    boxes = r.boxes
                    for box in boxes:
                        cls = int(box.cls[0])

                        if cls == 0:  # сидящие
                            self.people_sit += 1

                            x1, y1, x2, y2 = box.xyxy[0]
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (105, 225, 65), 2)
                        elif cls == 1:  # в очереди
                            self.people_in_queue += 1

                            x1, y1, x2, y2 = box.xyxy[0]
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (43, 80, 229), 2)

                self.people_total = self.people_sit + self.people_in_queue

                self.ready_to_get = True

                _, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    def async_frame_generator2(self):
        cap = cv2.VideoCapture(video_path2)
        while cap.isOpened():
            self.people_sit = 0
            self.people_in_queue = 0

            self.ready_to_get = False

            success, frame = cap.read()
            if success:
                results = model(frame, stream=True, verbose=False)

                for r in results:
                    boxes = r.boxes
                    for box in boxes:
                        cls = int(box.cls[0])

                        if cls == 0:  # сидящие
                            self.people_sit += 1

                            x1, y1, x2, y2 = box.xyxy[0]
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (105, 225, 65), 2)
                        elif cls == 1:  # в очереди
                            self.people_in_queue += 1

                            x1, y1, x2, y2 = box.xyxy[0]
                            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                            cv2.rectangle(frame, (x1, y1), (x2, y2), (43, 80, 229), 2)

                self.people_total = self.people_sit + self.people_in_queue

                self.ready_to_get = True

                _, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            else:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)


queue_worker = QueueWorker()


@app.get("/video1")
async def get_video():
    return StreamingResponse(queue_worker.async_frame_generator1(),
                             media_type="multipart/x-mixed-replace; boundary=frame")


@app.get("/video2")
async def get_video():
    return StreamingResponse(queue_worker.async_frame_generator2(),
                             media_type="multipart/x-mixed-replace; boundary=frame")


@app.get("/get_text_head")
async def post_text_head():
    people = queue_worker.people_total
    loads = random.randint(26, 38)
    data = {
        "people": str(people),
        "loads": str(loads) + '%'
    }
    return JSONResponse(content=data)


@app.get("/get_queue_info")
async def post_text_head():
    while not queue_worker.ready_to_get:
        pass
    else:
        people = queue_worker.people_in_queue

    loads_queue = people // 2.5

    text = get_predict(people)

    data = {
        "peopleInQueue": str(people),
        "estimatedWaitTime": str(loads_queue),
        "peopleQueue": text
    }
    return JSONResponse(content=data)


@app.get("/get_audio")
async def post_audio():
    hour = str(datetime.now().hour)

    people = queue_worker.people_total

    while not queue_worker.ready_to_get:
        pass
    else:
        people_in_queue = queue_worker.people_in_queue

    loads_queue = int(people // 2.5)
    needs = random.randint(26, 38)

    text = f'Сегодня в ресторане "Вега" в {hour} общая загруженность {needs}% количество людей {people}. {people_in_queue} человек в очереди. {loads_queue} минут займет ожидание.'

    speech_file_path = Path(__file__).parent / "speech.mp3"
    response = client.audio.speech.create(
        model="tts-1-hd",
        voice="nova",
        speed=0.92,
        input=text
    )
    response.stream_to_file(speech_file_path)

    return FileResponse(speech_file_path, media_type='audio/mpeg', filename="example.mp3")


def get_predict(people):
    data = pd.read_csv("queue_data.csv")

    features = data[['day_of_week', 'hour', 'minute']]
    target = data['people_count']

    # Разделение данных на обучающую и тестовую выборки
    X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)

    # Используем Random Forest для регрессии
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Предсказание и оценка модели
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)

    now = datetime.now()

    day_of_week = now.weekday()
    hour = now.hour

    rounded_minute = round(now.minute / 10) * 10
    if rounded_minute == 60:
        rounded_minute = 0
        now = now.replace(hour=now.hour + 1)

    next = pd.DataFrame({
        'day_of_week': [day_of_week],
        'hour': [hour],
        'minute': [rounded_minute]
    })

    count_next = model.predict(next)

    print(day_of_week, hour, rounded_minute, count_next, people)

    if int(count_next) > people:
        c = int(count_next) - people
        data = f'Через 10 минут будет больше людей на {c}.'
    else:
        if int(count_next) < people:
            c = int(people) - int(count_next)
            data = f'Через 10 минут будет меньше людей на {c}.'
        else:
            data = f'Через 10 минут будет такое-же количество челововек.'

    return data


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
