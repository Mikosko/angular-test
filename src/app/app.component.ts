import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	public title = 'testing-app';

	@MkClick()
	async processSomeAction(e) {
		console.log(e);
		return await this.processAction();
	}

	async processAction() {
		return await new Promise<boolean>((res, rej) => {
			setTimeout(() => {
				res(false);
			}, 1000);
		});
	}
}

export function MkClick(): MethodDecorator {
	return (_: () => boolean, __: string, descriptor: any) => {
		const originalMethod = descriptor.value;
		console.log(descriptor);

		descriptor.value = async function ({ event, callback }) {
			const result = await originalMethod.apply(this, [event]);
			console.log(result);
			callback.call(undefined, result);

			return result;
		};

		return descriptor;
	};
}
