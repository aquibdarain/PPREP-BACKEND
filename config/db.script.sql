-- PLACEMENT PREPARATION DATABASE SCRIPT 
USE PPREP;

-- CREATING THE TABLE FOR USER LOGIN AND SIGNUP
create table user( id int primary key AUTO_INCREMENT,name varchar(250),contactNumber varchar(20),
email varchar(50),password varchar(250),status varchar(20),role varchar(20),UNIQUE(email)
);
select * from user;

-- admin login  
insert into user(name,contactNumber,email,password,status,role) VALUES
('Admin','9370805845','admin@gmail.com','admin','true','admin');


create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);
 
create table blogs( id int AUTO_INCREMENT,title varchar(255) not null, description varchar(500), image varchar(255), content varchar(5000),primary key (id));
select * from blogs; 

create table technical( id int AUTO_INCREMENT,question varchar(1000), image varchar(255), 
answer varchar(255), primary key(id));
select * from technical;

create table aptitude(id int AUTO_INCREMENT,question varchar(1000), image varchar(255),
 answer varchar(255), primary key(id));
 select * from aptitude;

create table jobPost(id int  AUTO_INCREMENT, jobTitle varchar(255),jobDescription varchar(255),
qualification varchar(255),experience varchar(255),preferredSkills varchar(1000),
jobLocation varchar(255), email varchar(50),contact varchar(255),primary key (id));
select * from jobPost;


create table applyJob(id int  AUTO_INCREMENT,fullName varchar(255),address varchar(255),
contact varchar(255),email varchar(255),appliedPosition varchar(1000),
jobLocation varchar(255),resume varchar(255),primary key (id));
select * from applyJob;-- 

