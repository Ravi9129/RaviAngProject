module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/auth/register') {
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.join(__dirname, 'src', 'assets', 'db.json');
      
      try {
        const db = JSON.parse(fs.readFileSync(dbPath));
        const newUser = {
          id: db.users.length + 1,
          ...req.body,
          roles: ['user'],
          refreshToken: `user-${db.users.length + 1}-refresh-token`
        };
        
        db.users.push(newUser);
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        
        // Remove password from response
        const { password, ...userResponse } = newUser;
        res.status(201).json(userResponse);
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
      }
    } else {
      next();
    }
  };