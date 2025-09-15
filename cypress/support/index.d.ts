/// <reference types="cypress" />

import type testlioData from "../fixtures/testlioData.json";
import type week6inputs from "../fixtures/lumaData.json";

interface FixtureTypes {
  testlioData: typeof testlioData;
  lumaData: typeof lumaData;
  // add other fixtures here
}

declare global {
  namespace Cypress {
    interface Chainable {
      fixture<K extends keyof FixtureTypes>(
        fixtureName: K
      ): Chainable<FixtureType[K]>;
    }
    interface Chainable<Subject = any> {
      typeLoginDta(email: string, password: string): void;
      getElement(element: string, options?: object): Chainable<HTMLElement>;
      getFind(firstElem: string, secondElem: string): Chainable<HTMLElement>;
    }
  }
}