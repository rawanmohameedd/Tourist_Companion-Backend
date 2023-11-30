Create Table tourists(
	tour_username varchar(20),
 	email varchar(255),
  	first_name varchar(20),
  	last_name varchar(20),
	nationality varchar(20),
	brithday date,
	password varchar(255),
    profile_photo varchar(255),
	primary key(tour_username)
);

Create Table tourGuide(
	tourguide_username varchar(20),
 	email varchar(32),
  	first_name varchar(20),
  	last_name varchar(20),
	nationalid varchar(14),
	brithday date,
	spoken_lang text,
	password varchar(255),
    profile_photo varchar(255),
	license varchar(255),
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
