import psycopg

connection = psycopg.connect("dbname=psycopg-test")

connection.execute("""
    DROP TABLE IF EXISTS students;
    CREATE TABLE students (
        id serial PRIMARY KEY, 
        name varchar(255), 
        favorite_food varchar(255)
    );
""")


def insert_into_students(name, favorite_food):
    insert_query = f"""
        INSERT INTO students (name, favorite_food) 
        VALUES ('{name}', '{favorite_food}');
    """
    connection.execute(insert_query)


def insert_into_students_sanitized(name, favorite_food):
    insert_query = """
        INSERT INTO students (name, favorite_food) 
        VALUES (%s, %s);
    """
    connection.execute(insert_query, (name, favorite_food))


insert_into_students_sanitized("Alice", "Cake")
insert_into_students_sanitized("Bob", "Lemons")
insert_into_students_sanitized("Carol", "Tuna")

name = "David', 'Cauliflower'); DROP TABLE students;--"
favorite_food = "Pizza"
insert_into_students_sanitized(name, favorite_food)

results = connection.execute("SELECT * FROM students;")
print(results.fetchall())

connection.commit()
connection.close()
