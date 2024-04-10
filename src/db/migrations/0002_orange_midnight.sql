CREATE TABLE `vehicles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type_id` int,
	`name` varchar(100) NOT NULL,
	`is_available` boolean NOT NULL DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_type_id_vehicleType_id_fk` FOREIGN KEY (`type_id`) REFERENCES `vehicleType`(`id`) ON DELETE no action ON UPDATE no action;