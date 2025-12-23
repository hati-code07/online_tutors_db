const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Главная
app.get('/', (req, res) => {
  res.json({
    message: 'Trade App API',
    version: '1.0.0',
    endpoints: [
      'GET    /api/subjects',
      'GET    /api/subjects/:id',
      'POST   /api/subjects',
      'PUT    /api/subjects/:id',
      'DELETE /api/subjects/:id',
      'GET    /api/tutors',
      'GET    /api/courses',
      'GET    /api/students',
      'GET    /api/enrollments'
    ]
  });
});

// Функция для безопасной загрузки роутов
const loadRoute = (routePath, apiPath) => {
  try {
    const route = require(`./app/routes/${routePath}`);
    app.use(`/api/${apiPath}`, route);
    console.log(`✅ ${apiPath} routes loaded`);
    return true;
  } catch (error) {
    console.log(`⚠️  ${apiPath} routes not found: ${error.message}`);
    // Простой fallback маршрут
    app.get(`/api/${apiPath}`, (req, res) => {
      res.json({ message: `${apiPath} API endpoint`, status: 'active' });
    });
    return false;
  }
};

// Загружаем все роуты
loadRoute('subject.routes', 'subjects');
loadRoute('tutor.routes', 'tutors');
loadRoute('course.routes', 'courses');
loadRoute('student.routes', 'students');
loadRoute('enrollment.routes', 'enrollments');

// Обработка 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  console.log(`📁 App directory: ${__dirname}`);
});
