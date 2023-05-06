import React from "react";
import { Link } from "react-router-dom";
import { LivingInfo } from "../types/types";
interface LivingProps {
    livingInfo: LivingInfo;
}
const Living: React.FC<LivingProps> = ({ livingInfo }: LivingProps) => {
    return (
        <section className="living">
            <div className="living__container">
                <div className="living__items" style={{...livingInfo.items}}>
                    <div className="living__text">
                        <div className="living__title title">{livingInfo.title}</div>
                        <div className="living__decription">{livingInfo.description}</div>
                        <Link to="/Categories" className="living__button">Show more</Link>
                    </div>
                    <div className="living__image">
                        <img src={livingInfo.photo} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Living;