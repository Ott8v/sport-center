# Sport Center Backend

Backend API per la gestione di un centro sportivo, sviluppato con [AdonisJS](https://adonisjs.com/) e PostgreSQL.

## AVVIO APPLICAZIONE

### Configurazione
Copia `.env.example` in `.env` e configura le variabili d'ambiente necessarie:
```
TZ=UTC
PORT=3333
HOST=0.0.0.0
LOG_LEVEL=info
APP_KEY=
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=app
```

### Docker
```bash
# Avvia l'applicazione con Docker Compose
docker-compose up --build

# Per eseguire in background
docker-compose up -d --build
```

## API Endpoints

### Autenticazione
- `POST /login`  
  Login utente.  
  Body: `{ email, password }`

- `POST /register`  
  Registrazione utente.  
  Body: `{ name, surname, email, password }`

---

### Utenti
- `GET /users`  
  Restituisce la lista utenti.  
  Query params:
  - `noBookings=true` — Solo utenti senza prenotazioni

- `GET /users/:id`  
  Dettaglio utente

- `PUT /users/:id`  
  Modifica utente

- `DELETE /users/:id`  
  Elimina utente

- `GET /instructors/courses`  
  Lista istruttori con i loro corsi

- `GET /instructors/:instructorId/courses`  
  Corsi di un istruttore specifico

---

### Corsi
- `GET /courses`  
  Lista corsi  
  Query params:
  - `notFull=true` — Solo corsi non pieni

- `GET /courses/:id`  
  Dettaglio corso

- `POST /courses`  
  Crea corso

- `PUT /courses/:id`  
  Modifica corso

- `DELETE /courses/:id`  
  Elimina corso

- `GET /statistics/courses`  
  Corsi più prenotati  
  Query params:
  - `limit=5` — Numero massimo di corsi restituiti (default 5)

---

### Prenotazioni
- `GET /bookings`  
  Lista prenotazioni  
  Query params:
  - `status=pending|confirmed|cancelled` — Filtra per stato

- `GET /bookings/:id`  
  Dettaglio prenotazione

- `POST /bookings`  
  Crea prenotazione  
  Body: `{ courseId }`

- `PUT /bookings/:id`  
  Modifica stato prenotazione  
  Body: `{ status }`

- `DELETE /bookings/:id`  
  Elimina prenotazione

- `GET /statistics/bookings`  
  Statistiche prenotazioni per utente
