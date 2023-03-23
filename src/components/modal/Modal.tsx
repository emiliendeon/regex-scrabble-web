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

	if (visible === false) {
		return null;
	}

	return (
		<div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
			<div className="content" onClick={onContentClick}>
				{title && <div className="title">{title}</div>}
				{children}
				{onValidate && (
					<Button
						className="modal-validate-button"
						label="Valider"
						onClick={onValidate}
					/>
				)}
				<IconButton icon="close" onClick={onClose} />
			</div>
		</div>
	);
};

export default Modal;
