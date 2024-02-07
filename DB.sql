Create Table tourists(
	tour_username varchar(20),
 	emailT varchar(255),
  	first_nameT varchar(20),
  	last_nameT varchar(20),
	nationalityT varchar(20),
	brithdayT date,
	passwordT varchar(255),
    profile_photoT varchar(255),
	token VARCHAR(255),
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
	token VARCHAR(255),
	primary key(tourguide_username)
);

create table tickets (
	id serial primary key,
	tourist int,
	adult int,
	student int
);
create table museums (
	musid serial primary key,
	ticket_ID int,
	museinfo text,
	map varchar(255),
	model varchar(255),
	foreign key (ticket_ID) references tickets(id) 
);
create table rating_system(
	tourguuide_rate_id serial primary key,
	tourguide_username varchar(20)  references tourguide,
	tour_username varchar(20) references tourists,
	rate int,
	visit text,
	date_of_the_visit date
);