import "./modal.scss";

import Button from "../forms/button/Button";
import IconButton from "../forms/iconButton/IconButton";
import { useEffect } from "react";

type ModalProps = React.PropsWithChildren<{
	visible?: boolean;
	title?: string;
	onLoad?: () => void;
	onClose: () => void;
	onValidate?: () => void;
}>;

const Modal = ({ children, visible, title, onLoad, onClose, onValidate }: ModalProps) => {
	useEffect(() => {
		if (visible && onLoad) {
			onLoad();
		}
	}, [visible]);

	const onContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (onValidate) {
			onValidate();
		}
	};

	if (visible === false) {
		return null;
	}

	return (
		<div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
			<div className="content" onClick={onContentClick}>
				<form onSubmit={onSubmit}>
					{title && <div className="title">{title}</div>}
					{children}
					{onValidate && (
						<Button className="modal-validate-button" type="submit" label="Valider" />
					)}
					<IconButton icon="close" onClick={onClose} />
				</form>
			</div>
		</div>
	);
};

export default Modal;
