CREATE OR REPLACE PACKAGE workers_pkg AS
    -- return employees with their salary. Return the total in frontend
    FUNCTION get_workers RETURN worker_type_res PIPELINED;
    -- return employees with their department names
    FUNCTION get_workers_with_departments RETURN worker_and_department_res PIPELINED;
    -- return employees, their department names, and their annual salary
    FUNCTION get_workers_annual_salary RETURN worker_annual_res PIPELINED;
END workers_pkg;
/

CREATE OR REPLACE PACKAGE BODY workers_pkg AS
    FUNCTION get_workers
    RETURN worker_type_res PIPELINED
    AS
    BEGIN
        FOR rec IN (SELECT WORKER_ID, FIRST_NAME, LAST_NAME, EMAIL, HIRE_DATE, SALARY FROM WORKERS) LOOP
        PIPE ROW(worker_type(rec.WORKER_ID, rec.FIRST_NAME, rec.LAST_NAME, rec.EMAIL, rec.HIRE_DATE, rec.SALARY));
        END LOOP;
        RETURN;
    END get_workers;
    FUNCTION get_workers_with_departments
    RETURN worker_and_department_res PIPELINED
    AS
    BEGIN
    FOR rec IN (
        SELECT
            w.worker_id,
            w.first_name,
            w.last_name,
            w.email,
            w.hire_date,
            NVL(d.department_name, 'n/a') AS department_name,
            w.salary
        FROM WORKERS w
        LEFT JOIN DEPARTMENTS d ON w.department_id = d.department_id
    )
    LOOP
        PIPE ROW(worker_and_department(
            rec.worker_id,
            rec.first_name,
            rec.last_name,
            rec.email,
            rec.hire_date,
            rec.department_name
        ));
    END LOOP;

    RETURN;
    END get_workers_with_departments;
    FUNCTION get_workers_annual_salary
    RETURN worker_annual_res PIPELINED
    AS
    BEGIN
        FOR rec IN (        
            SELECT 
                w.WORKER_ID, 
                w.FIRST_NAME, 
                w.LAST_NAME, 
                w.EMAIL,
                w.HIRE_DATE,
                NVL(d.department_name, 'n/a') as "DEPARTMENT_NAME", 
                w.salary * 12 as annual_salary
            FROM WORKERS w
            LEFT JOIN DEPARTMENTS d ON w.department_id = d.department_id
        )
        LOOP
            PIPE ROW(worker_annual(
                rec.WORKER_ID,
                rec.FIRST_NAME,
                rec.LAST_NAME,
                rec.EMAIL,
                rec.HIRE_DATE,
                rec.DEPARTMENT_NAME,
                rec.ANNUAL_SALARY
            ));
        END LOOP;
        RETURN;
    END get_workers_annual_salary;
END workers_pkg;
/
