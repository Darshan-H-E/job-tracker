// server/src/server.js
import app from './app.js'; // Note the .js extension

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
