import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';
import { PasswordsForm } from '../../../core/models/forms.models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss'],
})
export class PasswordRecoveryFormComponent implements OnInit {
  passwordsForm: FormGroup<PasswordsForm> =
    this.formService.initPasswordsForm();
  uid = '';
  errorMessage: null | string = null;
  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notifierService: NotifierService,
    private router: Router,
  ) {}
  get controls(): PasswordsForm {
    return this.passwordsForm.controls;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => {
        this.uid = param.get('uid') as string;
      },
    });
  }
  getErrorMessage(control: FormControl<string>): string {
    return this.formService.getErrorMessage(control);
  }

  onPasswdChange() {
    const { password } = this.passwordsForm.getRawValue();
    this.authService.changePassword({ password, uid: this.uid }).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
        this.notifierService.notify('success', 'Poprawnie zmieniono haslo');
      },
      error: (err) => {
        this.errorMessage = err;
      },
    });
  }
}
