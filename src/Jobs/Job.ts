// Run Job every duration number of seconds
export function scheduleJob(job: Function, duration: number): void{
  setInterval(job, 1000 * duration);
}