-- CreateTable
CREATE TABLE "timeclock" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "assign_to_all" BOOLEAN,
    "group_ids" INTEGER[],
    "clockin_time" TIMESTAMP(3) NOT NULL,
    "clockout_time" TIMESTAMP(3) NOT NULL,
    "locale" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "org_id" INTEGER NOT NULL,
    "created_by" INTEGER NOT NULL,

    CONSTRAINT "timeclock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shift" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "org_id" INTEGER NOT NULL,
    "syear" INTEGER,
    "smonth" INTEGER,
    "sdate" INTEGER,
    "shour" INTEGER,
    "sminute" INTEGER,
    "eyear" INTEGER,
    "emonth" INTEGER,
    "edate" INTEGER,
    "ehour" INTEGER,
    "eminute" INTEGER,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
