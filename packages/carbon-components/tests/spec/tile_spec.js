import Tile from '../../src/components/tile/tile';
import clickableTile from '../../src/components/tile/tile--clickable.html';
import expandableTile from '../../src/components/tile/tile--expandable.html';
import selectableTile from '../../src/components/tile/tile--selectable.html';
import flattenOptions from '../utils/flatten-options';

describe('Test tile', function() {
  describe('Constructor', function() {
    let tile;

    it('Should throw if root element is not given', function() {
      expect(() => {
        tile = new Tile();
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        tile = new Tile(document.createTextNode(''));
      }).toThrowError(
        TypeError,
        'DOM element should be given to initialize this widget.'
      );
    });

    it('Should set default options', function() {
      const container = document.createElement('div');
      container.innerHTML = clickableTile;
      document.body.appendChild(container);
      tile = new Tile(document.querySelector('[data-tile]'));

      expect(flattenOptions(tile.options)).toEqual({
        selectorInit: '[data-tile]',
        selectorAboveTheFold: '[data-tile-atf]',
        selectorTileInput: '[data-tile-input]',
        classExpandedTile: 'bx--tile--is-expanded',
        classClickableTile: 'bx--tile--is-clicked',
        classSelectableTile: 'bx--tile--is-selected',
      });
    });

    afterEach(function() {
      if (tile) {
        tile = tile.release();
      }
    });
  });

  describe('Test _hookActions', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = clickableTile;

    beforeAll(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should be called', function() {
      spyOn(instance, '_hookActions');
      instance._hookActions();
      expect(instance._hookActions).toHaveBeenCalled();
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test clickable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = clickableTile;

    beforeAll(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-clicked class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-clicked')).toBe(
        false
      );
    });

    it('Should have the is-clicked class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-clicked')).toBe(true);
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test expandable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = expandableTile;

    beforeAll(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-expanded class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-expanded')).toBe(
        false
      );
    });

    it('Should have the is-expanded class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-expanded')).toBe(
        true
      );
    });

    it('Should have the is-expanded class after enter has been pressed', function() {
      tileElement.dispatchEvent(new CustomEvent('keydown', { bubbles: true }), {
        which: 13,
      });
      expect(tileElement.classList.contains('bx--tile--is-expanded')).toBe(
        true
      );
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('Test selectable tile', function() {
    let instance;
    let tileElement;
    const container = document.createElement('div');
    container.innerHTML = selectableTile;

    beforeAll(function() {
      document.body.appendChild(container);
      tileElement = container.querySelector('[data-tile]');
      instance = new Tile(tileElement);
    });

    it('Should not have the is-clicked class before its been clicked', function() {
      expect(tileElement.classList.contains('bx--tile--is-selected')).toBe(
        false
      );
    });

    it('Should have the is-clicked class after its been clicked', function() {
      tileElement.dispatchEvent(new CustomEvent('click', { bubbles: true }));
      expect(tileElement.classList.contains('bx--tile--is-selected')).toBe(
        true
      );
    });

    afterAll(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });
});
