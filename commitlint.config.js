module.exports = {
  extends: [
    '@commitlint/config-conventional'
  ],
  roles: {
    'type-enum': [
      2, // 验证的错误级别
      'always', // 什么情况下验证
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build'
      ]
    ],
    'subject-case': [0] // 大小写不验证
  }
}
