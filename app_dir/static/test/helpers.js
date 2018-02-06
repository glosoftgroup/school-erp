import { expect } from 'chai';
import { sinon, spy } from 'sinon';
import { mount, render, shallow } from 'enzyme';
import { hcharts } from "highcharts/highcharts";  // needed so that highcharts does not throw an error while loading tests

global.expect = expect;
global.sinon = sinon;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;

require('babel-core/register')({
  ignore: /node_modules\/(?!@material)/
});
