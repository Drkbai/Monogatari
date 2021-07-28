import { ScreenComponent } from './../../lib/ScreenComponent';

class NewGameScreen extends ScreenComponent {

	render () {
		return `
			<button class="top left" data-action="back"><span class="fas fa-arrow-left"></span></button>
			<h2 data-string="New">New Game</h2>
			<div data-ui="chapterSelect">
				<h3 data-string="ChapterSelect">Select Chapter</h3>
				<div data-ui="slots" class="row row--spaced padded">
					<slot-container label="${this.engine.setting ('ChapterLabel')}" type="load"></slot-container>
				</div>
			</div>
		`;
	}
}

NewGameScreen.tag = 'new-game-screen';


export default NewGameScreen;
