Create Table users(
	id serial primary key,
  email varchar(32),
  fname varchar(20),
  lname varchar(20),
  mobile varchar(15),
  nationality varchar(20),
	nationalid varchar(14),
	role varchar(10),
	brithday date,
	password varchar(20)
    --license
	--passport
	--profile photo
);

create table museums (
	musid serial primary key,
	ticket_tourist int,
	ticket_egy_adult int,
	ticket_egy_student int,
	ticket_egy_elder int,
	museinfo text.
	--map
);