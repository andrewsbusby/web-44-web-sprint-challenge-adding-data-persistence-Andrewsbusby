
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments('project_id')
    tbl.string('project_name', 128).notNullable()
    tbl.string('project_description', 300)
    tbl.boolean('project_completed')
  }),

  knex.schema.createTable('resources', tbl => {
    tbl.increments('resource_id')
    tbl.string('resource_name', 128).notNullable().unique()
    tbl.string('resource_descriptioin', 300)
  }),

  knex.schema.createTable('tasks', tbl => {
    tbl.increments('task_id')
    tbl.string('task_description').notNullable()
    tbl.string('task_notes')
    tbl.boolean('task_completed')
    tbl.integer('project_id').unsigned()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
