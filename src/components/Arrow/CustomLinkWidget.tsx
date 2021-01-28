import { PointModel } from '@projectstorm/react-diagrams';

export const CustomLinkArrowWidget = (props:{point: PointModel, previousPoint: PointModel, color:string, colorSelected:string, setState:({selected}:{selected:boolean})=>void}) => {
	const { point, previousPoint } = props;

	const angle =
		90 +
		(Math.atan2(
			point.getPosition().y - previousPoint.getPosition().y,
			point.getPosition().x - previousPoint.getPosition().x
		) *
			180) /
			Math.PI;

	//translate(50, -10),
	return (
		<g className="arrow" transform={'translate(' + point.getPosition().x + ', ' + point.getPosition().y + ')'}>
			<g style={{ transform: 'rotate(' + angle + 'deg)' }}>
				<g transform={'translate(0, -3)'}>
					<polygon
						points="0,10 8,30 -8,30"
						fill={props.color}
						onMouseLeave={() => {
							props.setState({ selected: false });
						}}
						onMouseEnter={() => {
							props.setState({ selected: true });
						}}
						data-id={point.getID()}
						data-linkid={point.getLink().getID()}></polygon>
				</g>
			</g>
		</g>
	);
};