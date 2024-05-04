from flask import Flask, render_template, request, Response, jsonify
import sqlite3

connection = sqlite3.connect('db.sqlite3')

cursor = connection.cursor()

# cursor.execute('DROP TABLE IF EXISTS menu;')
# cursor.execute('DROP TABLE IF EXISTS feedback;')
# cursor.execute('DROP TABLE IF EXISTS orders;')

cursor.execute('''
CREATE TABLE IF NOT EXISTS menu (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
type TEXT,
price REAL
);
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS feedback (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
msg TEXT
);
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS orders (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
time TEXT,
price REAL,
dishes TEXT
);
''')

connection.commit()
connection.close()

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('main.html')


@app.route('/mobile')
def mobile():
    return render_template('main-web.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')


@app.route('/api/menu/get', methods=['GET'])
def menu_get():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    res = []

    for i in cur.execute("SELECT * FROM menu"):
        res.append({"id": i[0], "name": i[1], "type": i[2], "price": i[3]})

    print(res)

    conn.commit()
    return jsonify(res)


@app.route('/api/menu/post', methods=['POST'])
def menu_post():
    data = request.json
    method = data.get('method')

    if method == 'add':
        name = data.get('name')
        tp = data.get('tp')
        price = data.get('price')
        insert_menu(name, tp, price)
    else:
        id = data.get('id')
        delete_menu(id)

    return Response('', 200)


@app.route('/api/feedback/get', methods=['GET'])
def feedback_get():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    res = []

    for i in cur.execute("SELECT * FROM feedback"):
        res.append({"name": i[1], "feedback": i[2]})

    print(res)

    conn.commit()
    return jsonify(res)


@app.route('/api/feedback/post', methods=['POST'])
def feedback_post():
    data = request.json
    print(data)

    name = data.get('name')
    feedback = data.get('feedback')

    insert_feedback(name, feedback)

    return Response('', 200)


@app.route('/order', methods=['GET'])
def order():
    return render_template('order.html')


@app.route('/api/order/post', methods=['POST'])
def order_post():
    data = request.json
    print(data)

    name = data.get('name')
    time = data.get('time')
    price = data.get('price')
    ids = data.get('ids')

    insert_order(name, time, price, ids)

    return Response('', 200)


@app.route('/api/order/del/post', methods=['POST'])
def order_post_del():
    data = request.json
    print(data)
    id = data.get('id')

    delete_order(id)

    return Response('', 200)


@app.route('/api/order/get', methods=['GET'])
def order_get():
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    res = []

    for i in cur.execute("SELECT * FROM orders"):
        print(i)
        res.append({'id': i[0], 'name': i[1], 'time': i[2], 'price': i[3], 'dishes': i[4]})

    print(res)

    conn.commit()
    return jsonify(res)


def insert_feedback(name, msg):
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    sql = 'INSERT INTO feedback (name, msg) VALUES(?, ?)'

    cur.execute(sql, (name, msg))
    conn.commit()
    conn.close()
    
    
def insert_order(name, time, price, ids):
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()
    
    dishes = []
    for id in ids:
        for i in cur.execute(f"SELECT * FROM menu WHERE id = {id}"):
            dishes.append(f"{i[1]} ({i[2]})")
    dishes = ";".join(dishes)
            
    print(dishes)

    sql = 'INSERT INTO orders (name, time, price, dishes) VALUES(?, ?, ?, ?)'

    cur.execute(sql, (name, time, price, dishes))
    conn.commit()
    conn.close()
    
    
def delete_order(id):
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    sql = 'DELETE FROM orders WHERE id = ?'

    cur.execute(sql, id)
    conn.commit()
    conn.close()


def insert_menu(name, tp, price):
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    sql = 'INSERT INTO menu (name, type, price) VALUES(?, ?, ?)'

    cur.execute(sql, (name, tp, price))
    conn.commit()
    conn.close()


def delete_menu(id):
    conn = sqlite3.connect('db.sqlite3')
    cur = conn.cursor()

    sql = 'DELETE FROM menu WHERE id = ?'

    cur.execute(sql, id)
    conn.commit()
    conn.close()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001, debug=True)
