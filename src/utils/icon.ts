import {
	type IconName,
	type NonOrientableIconName,
	type OrientableIconName,
	OrientableIconNames,
} from "../types/icon";

import { type Orientation } from "../types/component";

export const IconLabels: {
	[K in IconName]: K extends OrientableIconName ? { [L in Orientation]: string } : string;
} = {
	arrow: {
		up: "Retour",
		right: "Voir le détail",
		down: "Voir le détail",
		left: "Précédent",
	},
	caret: {
		up: "Masquer",
		right: "Voir le détail",
		down: "Afficher",
		left: "Masquer le détail",
	},
	close: "Fermer",
	menu: "Menu",
	valid: "Oui",
	invalid: "Non",
};

export const computeIconLabel = (icon: IconName, orientation?: Orientation): string => {
	if ((OrientableIconNames as readonly IconName[]).includes(icon)) {
		return (IconLabels[icon] as (typeof IconLabels)[OrientableIconName])[
			orientation ?? "right"
		];
	}
	return IconLabels[icon] as (typeof IconLabels)[NonOrientableIconName];
};
