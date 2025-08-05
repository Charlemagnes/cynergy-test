-- these are the custom types I made so the functions would return a table

-- for returning workers and their department
create or replace TYPE worker_and_department AS OBJECT (
    worker_id INT,
    first_name VARCHAR2(50),
    last_name VARCHAR2(50),
    email VARCHAR2(100),
    hire_date DATE,
    department_name VARCHAR2(50)
);

create or replace TYPE worker_and_department_res IS TABLE OF worker_and_department

-- for returing the annual salary of workers
create or replace TYPE worker_annual IS OBJECT
(
    WORKER_ID INT,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    DEPARTMENT_NAME VARCHAR(50),
    ANNUAL_SALARY NUMBER(8,2)
);

create or replace TYPE worker_annual_res IS TABLE OF worker_annual

-- for returning workers (and doing total calculations in the frontend)
create or replace TYPE worker_type IS OBJECT
(
    WORKER_ID INT,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    EMAIL VARCHAR(100),
    HIRE_DATE DATE,
    SALARY NUMBER(8,2)
)
create or replace TYPE worker_type_res IS TABLE OF worker_type

