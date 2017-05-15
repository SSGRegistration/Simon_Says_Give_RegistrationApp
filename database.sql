--Database name: ssg_registration

--create user table
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null,
  "password" varchar(120) not null
);

CREATE TABLE "volunteer" (
"id" serial not null,
"email" varchar(80) not null,
"first_name" varchar(80) not null,
"last_name" varchar(80) not null,
"address1" varchar(120),
"address2" varchar(120),
"city" varchar(80),
"state" varchar(2),
"zip" varchar(5),
"under_18" boolean DEFAULT TRUE,
"birthdate" date,
"has_signed_waiver" boolean DEFAULT FALSE,
"has_allowed_photos" boolean DEFAULT TRUE,
"parent_email" varchar(80),
"validation_required" boolean DEFAULT FALSE,
"school" varchar(80),
"employer" varchar(120),
"employer_match" boolean DEFAULT FALSE,
PRIMARY KEY(email, first_name, last_name)
);

CREATE TABLE "volunteer_hours" (
"id" serial not null,
"volunteer_id" integer not null,
"event_id" varchar(15),
"date" date,
"time_in" time,
"time_out" time
);
