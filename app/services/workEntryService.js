import { executeQuery } from "../database/database.js";

const createWorkEntry = async (task_id) => {
  await executeQuery(
    "INSERT INTO work_entries (task_id, started_on) VALUES ($taskId, NOW());",
    {
      taskId: task_id,
    }
  );
};

const findCurrentWorkEntry = async (task_id) => {
  let result = await executeQuery(
    "SELECT * FROM work_entries WHERE task_id = $taskId AND finished_on IS NULL;",
    {
      taskId: task_id,
    }
  );

  if (result.rows && result.rows.length > 0) {
    return result.rows[0];
  }

  return false;
};

const finishWorkEntry = async (id) => {
  await executeQuery(
    "UPDATE work_entries SET finished_on = NOW() WHERE id = $id;",
    {
      id: id,
    }
  );
};

const calculateTotalTime = async (task_id) => {
    let result = await executeQuery(
      `SELECT SUM(finished_on - started_on) AS total_time
        FROM work_entries
        WHERE task_id = $taskId
          AND finished_on IS NOT NULL`,
      {
        taskId: task_id,
      }
    );
  
    if (result.rows && result.rows[0] && result.rows[0].total_time) {
      return result.rows[0].total_time;
    }
  
    return 0;
  };
export { createWorkEntry, findCurrentWorkEntry, finishWorkEntry, calculateTotalTime };