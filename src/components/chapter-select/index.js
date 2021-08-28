import { Component } from './../../lib/Component';
import { Text } from '@aegis-framework/artemis';
import moment from 'moment/min/moment-with-locales';

class ChapterSelect extends Component {

	static shouldRollback () {
		return Promise.resolve ();
	}

	static willRollback () {
		return Promise.resolve ();
	}

	constructor () {
		super ();
		this.props = {
			slot: '',
			name: '',
			date: '',
			screenshot: '',
			image: ''
		};

		this.data = null;
	}

	willMount () {
		this.classList.add ('row__column', 'row_column--6', 'row__column--tablet--4', 'row__column--desktop--3', 'row__column--desktop-large--2');

		return this.engine.Storage.get (this.slot).then ((data) => {
			this.data = data;

			if (typeof data.Engine !== 'undefined') {
				data.name = data.Name;
				data.date = data.Date;
				try {
					if (data.date.indexOf ('/') > -1) {
						const [date, time] = data.date.replace (',', '').split (' ');
						const [month, day, year] = date.split ('/');
						if (isNaN (Date.parse (date))) {
							data.date = `${year}-${day}-${month} ${time}`;
						} else {
							data.date = `${year}-${month}-${day} ${time}`;
						}
					}
				} catch (e) {
					this.engine.debug.debug ('Failed to convert date', e);
				}

				data.image = data.Engine.Scene;
			}

			this.setProps ({
				name: data.name,
				date: data.date,
				image: data.image
			});
		});
	}

	render () {
		let background = '';

		const hasImage = this.props.image && this.engine.asset ('scenes', this.props.image);

		if (hasImage) {
			background = `url(${this.engine.setting ('AssetsPath').root}/${this.engine.setting ('AssetsPath').scenes}/${this.engine.asset ('scenes', this.props.image)})`;
		} else if ('game' in this.data) {
			if (this.data.game.state.scene) {
				background = this.data.game.state.scene;

				if (background.indexOf (' with ') > -1) {
					background = Text.prefix (' with ', background);
				}

				background = Text.suffix ('show scene', background);

			} else if (this.data.game.state.background) {
				background = this.data.game.state.background;

				if (background.indexOf (' with ') > -1) {
					background = Text.prefix (' with ', background);
				}

				background = Text.suffix ('show background', background);
			}
		}
		return `
			<small class='badge'>${this.props.name}</small>
			<div data-content="background" style="${hasImage ? 'background-image' : 'background'}: ${background}"></div>
			<figcaption>${moment (this.props.date).format ('LL LTS')}</figcaption>
		`;
	}
}

ChapterSelect.tag = 'chapter-select';


export default ChapterSelect;
