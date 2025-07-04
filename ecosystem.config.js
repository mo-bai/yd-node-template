// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'yd-node-template',
      script: 'npm',
      args: 'run start', // 直接执行 npm run start
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false, // 关闭监听
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      error_file: './logs/yd-app-error.log',
      out_file: './logs/yd-app-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
