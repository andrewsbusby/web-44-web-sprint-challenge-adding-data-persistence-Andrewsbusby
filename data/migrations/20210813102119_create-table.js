
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
    tbl.increments('project_id')
    tbl.text('project_name', 128).notNullable()
    tbl.text('project_description', 300)
    tbl.boolean('project_completed')
  }),

  knex.schema.createTable('resources', tbl => {
    tbl.increments('resource_id')
    tbl.text('resource_name', 128).notNullable().unique()
    tbl.text('resource_descriptioin', 300)
  }),

  knex.schema.createTable('tasks', tbl => {
    tbl.increments('task_id')
    tbl.text('task_description', 300).notNullable()
    tbl.text('task_notes', 500)
    tbl.boolean('task_completed')
    tbl.integer('project_id').unsigned()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESCRICT')
        .onUpdate('RESTRICT')
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
