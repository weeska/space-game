import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as fs from 'fs';

const databaseFile = './data.db';

function createUser(app: INestApplication, name: string) {
  return request(app.getHttpServer())
    .post('/imperators') //TODO: /imperators instead of /imperators
    .send({ name })
    .expect(201)
}

function getPlanets(app: INestApplication, userId: number) {
  return request(app.getHttpServer())
    .get('/imperators/' + userId + '/planets') //TODO: misleading, this is a userId, not a planetId
    .expect(200);
}

function getResources(app: INestApplication, planetId: number) {
  return request(app.getHttpServer())
    .get('/planets/' + planetId + '/resources')
    .expect(200);
}

function getDefenses(app: INestApplication, planetId: number) {
  return request(app.getHttpServer())
    .get('/planets/' + planetId + '/defenses')
    .expect(200);
}

function getShips(app: INestApplication, planetId: number) {
  return request(app.getHttpServer())
    .get('/planets/' + planetId + '/ships')
    .expect(200);
}

function getStructures(app: INestApplication, planetId: number) {
  return request(app.getHttpServer())
    .get('/planets/' + planetId + '/structures')
    .expect(200);
}

function getTech(app: INestApplication, userId: number) {
  return request(app.getHttpServer())
    .get('/imperators/' + userId + '/tech')
    .expect(200);
}

describe('Space Game', () => {
  let app: INestApplication;

  const name = 'e2e imperator';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    if (fs.existsSync(databaseFile)) {
      fs.unlinkSync(databaseFile);
    }
  })

  it('adding a user', async () => {
    const { body: user } = await createUser(app, name);
    const { body: planets } = await getPlanets(app, user.id)
    const { body: tech } = await getTech(app, user.id);

    expect(user).toMatchObject({ name, id: expect.any(Number) });
    expect(planets).toMatchObject([{ id: expect.any(Number), name: `${name}'s Home` }]);
    expect(tech).toMatchObject([]);

    const planet = planets[0];

    await getResources(app, planet.id).expect({ metal: 2500, crystal: 1500, tritium: 500, planetId: planet.id });
    await getStructures(app, planet.id).expect([]);
    await getShips(app, planet.id).expect([]);
    await getDefenses(app, planet.id).expect([]);
  });

  it('building structures', async () => {
    const { body: user } = await createUser(app, name);
    const { body: planets } = await getPlanets(app, user.id);

    const planet = planets[0];

    for(let times = 1; times <= 5; ++times) {
      const { body: job } = await request(app.getHttpServer())
        .post('/planets/' + planet.id + '/structures')
        .send({ planetId: planet.id, name: 'metal_mine' })
        .expect(201);
  
      await new Promise(r => setTimeout(r, job.time + 50));
    }

    await getStructures(app, planet.id).expect([{
      planetId: planet.id,
      name: 'metal_mine',
      level: 5,
    }]);
  });

  it('researching technologies', async () => {
    const { body: user } = await createUser(app, name);
    const { body: planets } = await getPlanets(app, user.id)

    const planet = planets[0];

    for(let times = 1; times <= 5; ++times) {
      const { body: job } = await request(app.getHttpServer())
        .post('/imperators/' + planet.id + '/tech')
        .send({ planetId: planet.id, name: 'armor' })
        .expect(201);
  
      await new Promise(r => setTimeout(r, job.time + 50));
    }

    await getTech(app, user.id).expect([{
      userId: user.id,
      name: 'armor',
      level: 5,
    }]);
  });  

  it('building ships', async () => {
    const { body: user } = await createUser(app, name);
    const { body: planets } = await getPlanets(app, user.id)

    const planet = planets[0];

    await request(app.getHttpServer())
      .post('/planets/' + planet.id + '/ships')
      .send({ planetId: planet.id, name: 'light_fighter', amount: 16 })
      .expect(201);

    await getShips(app, planet.id).expect([{
      planetId: planet.id,
      name: 'light_fighter',
      amount: 16,
    }]);
  });  
});
