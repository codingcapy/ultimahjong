CREATE TABLE "games" (
	"game_id" serial PRIMARY KEY NOT NULL,
	"year" varchar,
	"created_at" varchar,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "players" (
	"player_id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"active" boolean NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "records" (
	"record_id" serial PRIMARY KEY NOT NULL,
	"game_id" integer,
	"winner" varchar,
	"loser" varchar,
	"points" integer,
	"created_at" varchar,
	"active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
