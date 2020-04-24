import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	EventEmitter,
	Output,
	ChangeDetectorRef,
} from '@angular/core';

export enum BtnState {
	Default,
	Process,
	Success,
	Failure,
}

@Component({
	selector: 'mk-button',
	templateUrl: './mk-button.component.html',
	styleUrls: ['./mk-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkButtonComponent implements OnInit {
	constructor(private ref: ChangeDetectorRef) {
		this.cbResolver = this.cbResolver.bind(this);
	}

	public readonly BtnState = BtnState;
	public renderItems = [BtnState.Default];

	@Input() public state: BtnState = BtnState.Default;
	@Output() public mkClick = new EventEmitter();

	ngOnInit() {}

	public onClick(e: MouseEvent) {
		if (this.state !== BtnState.Process) {
			setTimeout(() => {
				this.mkClick.emit({
					callback: this.cbResolver,
					event: e,
				});
			}, 35);
		}

		this.state = BtnState.Process;
	}

	public cbResolver(isSuccess: boolean) {
		console.log(isSuccess);
		console.log(this);

		if (isSuccess) {
			this.state = BtnState.Success;
		} else {
			this.state = BtnState.Failure;

			setTimeout(() => {
				this.state = BtnState.Default;

				this.ref.markForCheck();
			}, 1000);
		}

		this.ref.markForCheck();
	}
}
