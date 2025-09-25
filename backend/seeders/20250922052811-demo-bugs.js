'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const emptyTextArray = Sequelize.literal('ARRAY[]::text[]');
    await queryInterface.bulkInsert('bugs', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'Login button unresponsive on Safari',
        description: 'Clicking login does nothing on Safari 15 on macOS Monterey.',
        difficulty: 'Medium',
        expected_outcome: 'Clicking login should authenticate and redirect to dashboard.',
        actual_outcome: 'No network request fired; UI stays on login page.',
        problem_identified: 'Likely event listener prevented due to passive event on touchstart.',
        status: 'Open',
        resolution: null,
        tags: ['frontend', 'safari', 'auth'],
        images: emptyTextArray,
        is_favorite: false,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'qa.alex'
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'API 500 when creating bug without tags',
        description: 'POST /bugs returns 500 if tags omitted.',
        difficulty: 'Easy',
        expected_outcome: 'Empty array default should be used for tags.',
        actual_outcome: 'Server throws validation error and returns 500.',
        problem_identified: 'Missing default in request parsing path.',
        status: 'In Progress',
        resolution: null,
        tags: ['backend', 'api'],
        images: emptyTextArray,
        is_favorite: false,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'dev.mina'
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'Memory leak in WebSocket reconnect logic',
        description: 'Every reconnect increments listeners and memory usage grows.',
        difficulty: 'Hard',
        expected_outcome: 'Single listener per connection lifecycle.',
        actual_outcome: 'Multiple listeners accumulate; heap grows 2MB/min under churn.',
        problem_identified: 'Missing cleanup on close; exponential backoff jitter missing.',
        status: 'Testing',
        resolution: 'Detach listeners in finally; add jittered backoff.',
        tags: ['realtime', 'performance'],
        images: emptyTextArray,
        is_favorite: true,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'eng.sana'
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'Incorrect total on invoice with discount and tax',
        description: 'Tax applied before discount; should be after.',
        difficulty: 'Critical',
        expected_outcome: 'Total = (subtotal - discount) * (1 + taxRate).',
        actual_outcome: 'Total = subtotal * (1 + taxRate) - discount.',
        problem_identified: 'Order of operations bug.',
        status: 'Open',
        resolution: null,
        tags: ['billing', 'math'],
        images: emptyTextArray,
        is_favorite: false,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'pm.ravi'
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        title: 'Image upload fails for PNG > 5MB',
        description: '413 from CDN edge despite server limit 10MB.',
        difficulty: 'Medium',
        expected_outcome: 'Uploads up to 10MB should succeed.',
        actual_outcome: 'Uploads between 5-10MB rejected by CDN.',
        problem_identified: 'CDN max_body_size misconfigured to 5MB.',
        status: 'Resolved',
        resolution: 'Raised CDN limit to 10MB and added client-side warning.',
        tags: ['infra', 'cdn', 'uploads'],
        images: emptyTextArray,
        is_favorite: false,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'ops.jin'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bugs', null, {});
  }
};
