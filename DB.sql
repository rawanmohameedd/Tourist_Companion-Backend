Create Table tourists(
	tour_username varchar(20),
	emailT varchar(255),
	first_nameT varchar(20),
	last_nameT varchar(20),
	nationalityT varchar(20),
	brithdayT date,
	passwordT varchar(255),
    profile_photoT varchar(255),
	primary key(tour_username)
);

Create Table tourGuide(
	tourguide_username varchar(20),
	emailTG varchar(32),
	first_nameTG varchar(20),
	last_nameTG varchar(20),
	nationalidTG varchar(14),
	brithdayTG date,
	spoken_langTG text,
	passwordTG varchar(255),
    profile_photoTG varchar(255),
	licenseTG varchar(255),
    isavailable boolean default true,
    avgRating NUMERIC(10, 2),
	primary key(tourguide_username)
);
alter table tourguide add column pending boolean default true

create table museums (
	musid serial primary key,
	museum_name varchar(255),
	ticket_tourist varchar(10),
	ticket_adult varchar(10),
	ticket_student varchar(10),
	museinfo text,
	map varchar(255),
    musuem_image varchar(255)
);

create table rating_system(
	tourguide_rate_id serial primary key,
	tourguide_username varchar(20)  references tourguide,
	tour_username varchar(20) references tourists,
	rate int,
	visit text,
	date_of_the_visit date
);

CREATE TABLE tourists_requests (
    tourguide_username VARCHAR(20) NOT NULL,
    tour_username VARCHAR(20) NOT NULL,
    is_one_visit BOOLEAN NOT NULL,
    visit_date DATE,
    place VARCHAR(255),
    start_date DATE,
	end_date date
);

alter table tourists_requests add column pending boolean default true

create table admins (
	id int ,
	password varchar (255),
	name varchar (25)
)

alter table museums add column status boolean default false

create table museum_rooms(
	room_number serial primary key,
	room_name varchar(25),
	location text,
	musuem_name varchar(50),
	avg_capacity int,
	full_capacity int
);

CREATE TABLE Indoor_management (
    username VARCHAR(20),
    role VARCHAR(20),
    museum_name varchar(50),
    location TEXT
);


Create table Bssid (
	museum_name varchar (255),
	bssid varchar(17)
)