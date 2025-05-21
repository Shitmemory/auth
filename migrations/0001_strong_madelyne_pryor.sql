CREATE TABLE "adminUserEmailAddresses" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "adminEmailUniqueIndex" ON "adminUserEmailAddresses" USING btree (lower("email"));