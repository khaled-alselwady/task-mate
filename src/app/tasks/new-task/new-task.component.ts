import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { NewTaskData } from '../task/task.model';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);

  private changeTheRouteAfterAdding() {
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }

  onSubmit() {
    this.submitted = true;

    const taskData: NewTaskData = {
      userId: +this.userId(),
      title: this.enteredTitle(),
      summary: this.enteredSummary(),
      dueDate: new Date(this.enteredDate()).toISOString(),
    };
    this.tasksService.addTask(taskData).subscribe({
      complete: () => {
        this.changeTheRouteAfterAdding();
      },
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (component.submitted) {
    return true;
  }

  if (
    component.enteredDate() ||
    component.enteredSummary() ||
    component.enteredTitle()
  ) {
    return window.confirm('Are you sure you want to discard changes?');
  }
  return true;
};
