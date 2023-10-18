import csv

class Student:
    def __init__(self,id, first_name, last_name, age, grade):
        self.id =id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.grade = grade

def read_student_data(filename):
    students = []
    try:
        with open(filename, mode='r', newline='') as file:
            reader = csv.DictReader(file)
            for row in reader:
                student = Student(**row)
                students.append(student)
    except FileNotFoundError:
        print("Student data file not found.")
    return students

def write_student_data(filename, students):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['id', 'first_name', 'last_name', 'age', 'grade'])
        for student in students:
            writer.writerow([student.id, student.first_name, student.last_name, student.age, student.grade])

def main():
    filename = './data.csv'
    students = read_student_data(filename)

    while True:
        print("\nStudent Management Menu:")
        print("1. View Student Information")
        print("2. Add Student")
        print("3. Delete Student")
        print("4. Exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            # View Student Information
            for student in students:
                print(f"{student.id}: {student.first_name} {student.last_name}, Age: {student.age}, Grade: {student.grade}")

        elif choice == '2':
            # Add Student
            student_id = input("Enter Student ID: ")
            first_name = input("Enter First Name: ")
            last_name = input("Enter Last Name: ")
            age = input("Enter Age: ")
            grade = input("Enter Grade: ")
            new_student = Student(student_id, first_name, last_name, age, grade)
            students.append(new_student)
            write_student_data(filename, students)
            print("Student added successfully.")

        elif choice == '3':
            # Delete Student
            student_id = input("Enter Student ID to delete: ")
            students = [s for s in students if s.id != student_id]
            write_student_data(filename, students)
            print("Student deleted successfully.")

        elif choice == '4':
            # Exit
            print("Goodbye!")
            break

        else:
            print("Invalid choice. Please enter a valid option.")

if __name__ == '__main__':
    main()