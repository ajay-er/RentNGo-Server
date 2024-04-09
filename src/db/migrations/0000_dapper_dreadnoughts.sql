CREATE DATABASE `test`;
--> statement-breakpoint
CREATE TABLE `test`.`testing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	CONSTRAINT `testing_id` PRIMARY KEY(`id`)
);
