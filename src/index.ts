import { Injector, Logger, settings } from "replugged";
import consts from "./lib/consts";
import "./style.css";
import { registerSettings } from "./Components/Settings";
export const PluginInjector = new Injector();
export const { utils: PluginInjectorUtils } = PluginInjector;
export const PluginLogger = Logger.plugin("AssthethickInvites", "#b380ff");
export const SettingValues = await settings.init(
  "dev.tharki.AssthethickInvites",
  consts.defaultSettings,
);

import Injections from "./patches/index";

export const start = (): void => {
  registerSettings();
  Injections.applyInjections();
};

export const stop = (): void => {
  PluginInjector.uninjectAll();
};

export { Settings } from "./Components/Settings.jsx";
