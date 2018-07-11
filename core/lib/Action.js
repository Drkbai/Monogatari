class Action {

	static configuration (object = null) {
		if (object !== null) {
			Action._configuration = Object.assign ({}, Action._configuration, object);
		} else {
			return Action._configuration;
		}
	}

	static reset () {

	}

	static setup () {
		return Promise.resolve ();
	}

	static bind () {
		return Promise.resolve ();
	}

	static init () {
		return Promise.resolve ();
	}

	static match () {
		return false;
	}

	static matchString () {
		return false;
	}

	static matchObject () {
		return false;
	}

	constuctor () {

	}

	setContext (context) {
		this.context = context;
	}

	willApply () {
		return Promise.resolve ();
	}

	apply () {
		return Promise.resolve ();
	}

	interrupt () {
		return Promise.resolve ();
	}

	didApply () {
		return Promise.resolve ();
	}

	willRevert () {
		return Promise.resolve ();
	}

	revert () {
		return Promise.resolve ();
	}

	didRevert () {
		return Promise.resolve ();
	}

	clear () {
		return Promise.resolve ();
	}
}

Action._configuration = {};

export { Action };