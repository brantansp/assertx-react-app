module.exports = {

  apps: [

    {
      name: 'backend-server',
      script: './server.js',
      cwd: './',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'fork',
      pm2_max_memory_restart: '10',
      watch_delay: 5000,
      exp_backoff_restart_delay: 100,
      restart_delay: 1000,
      max_restarts: 1,
      min_uptime: 5000,
      autorestart: false,
    },
    {
      name: "UI-build",
      cwd: "./client/",
      script: "npm",
      args: "run build",
      watch: false,
      env: {
        NODE_ENV: "production"
      },
      interpreter: 'none',
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: false,
      wait_ready: true,
      listen_timeout: 3000,
      pm2_env: {
        status: false,
      }
    },
    {
      name: "UI-server",
      cwd: "./client/",
      script: "npm",
      args: "run serve",
      watch: false,
      env: {
        NODE_ENV: "production"
      },
      interpreter: 'none',
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      autorestart: true,
      wait_ready: true,
      listen_timeout: 3000,
      detached: true,
    }
  ]
};