// pm2.config.js
module.exports = {
  apps: [
    {
      name: 'yd-node-template',
      script: './app.ts',
      instances: 1,
      exec_mode: 'cluster',
      interpreter: './node_modules/.bin/ts-node', // 使用本地 ts-node
      interpreter_args: '--project ./tsconfig.json --transpile-only', // 指定 tsconfig.json 文件
      autorestart: true,
      watch: true,
      env: {
        NODE_ENV: 'development',
        TS_NODE_PROJECT: './tsconfig.json',
        TS_NODE_TRANSPILE_ONLY: 'true'
      },
      env_production: {
        NODE_ENV: 'production',
        TS_NODE_PROJECT: './tsconfig.json',
        TS_NODE_TRANSPILE_ONLY: 'true'
      },
      error_file: './logs/yd-app-error.log',
      out_file: './logs/yd-app-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
}
