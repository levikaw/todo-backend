import { generateHash } from 'src/modules/user/domain/utils';
import { UserRolesEntity } from 'src/modules/user/infrastructure/entities/user-roles.entity';
import { UserEntity } from 'src/modules/user/infrastructure/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitApp1720003556373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."roles_alias_enum" AS ENUM('admin', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alias" "public"."roles_alias_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_7165de494fc9262f6c31965cca1" UNIQUE ("alias"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "family" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "lnk_admin_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "adminId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_f016436cd8814c4faedecd2b42d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_priority_enum" AS ENUM('high', 'medium', 'low')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_status_enum" AS ENUM('backlog', 'canceled', 'done', 'progress')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "expiredAt" TIMESTAMP NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" "public"."tasks_priority_enum" NOT NULL DEFAULT 'medium', "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'backlog', "authorId" uuid NOT NULL, "assignedToId" uuid NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lnk_admin_user" ADD CONSTRAINT "FK_5962c7ec7c722815c35c5590b79" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lnk_admin_user" ADD CONSTRAINT "FK_655932c5e5c745362ef33ec4202" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_b455b2f078b9a28bda8e7b3696a" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_d020677feafe94eba0cb9d846d1" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.manager.save(UserRolesEntity, {
      id: '00000000-0000-0000-0000-000000000001',
      alias: 'admin',
    });

    await queryRunner.manager.save(UserRolesEntity, {
      id: '00000000-0000-0000-0000-000000000002',
      alias: 'user',
    });

    await queryRunner.manager.save(UserEntity, {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'admin',
      surname: 'admin',
      family: 'admin',
      roleId: '00000000-0000-0000-0000-000000000001',
      login: 'admin',
      password: await generateHash(process.env.STRONG_ADMIN_PASSWORD),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
