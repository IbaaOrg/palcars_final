import { useContext } from "react";
import { TranslateContext } from '../../Context/Translate';
import '../../../css/privacy/privacy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const PrivacyPolicy = () => {
    // const {translates}=useContext(TranslateContext)
    const { translates } = useContext(TranslateContext);
    return (
        <div className="container my-5">
            <h1 className="display-6 text-primary mb-4 text-center">{translates.PrivacyPolicy}</h1>
            <p className="mx-auto lead text-secondary text-justify privacy-text text-center" style={{ maxWidth: '600px' }}>{translates.details}</p>
            <ul className="list-group privacy-list mx-auto text-secondary text-justify text-center" style={{ maxWidth: '600px' }}>
                <li className="list-group-item privacy-list-item"><b>{translates.p1}</b></li>
                <p><b>- {translates.p2}:</b> {translates.p3}</p>
                <p><b>- {translates.p4}:</b> {translates.p5}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p6}</b></li>
                <p><b>- {translates.p7}:</b> {translates.p8}</p>
                <p><b>- {translates.p9}:</b> {translates.p10}</p>
                <p><b>- {translates.p11}:</b> {translates.p12}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p13}</b></li>
                <p><b>- {translates.p14}:</b> {translates.p15}</p>
                <p><b>- {translates.p16}:</b> {translates.p17}</p>
                <p><b>- {translates.p18}:</b> {translates.p19}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p20}</b></li>
                <p><b>- {translates.p21}:</b> {translates.p22}</p>
                <p><b>- {translates.p23}:</b> {translates.p24}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p25}</b></li>
                <p><b>- {translates.p26}:</b> {translates.p27}</p>
                <p><b>- {translates.p28}:</b> {translates.p29}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p30}</b></li>
                <p><b>- {translates.p31}:</b> {translates.p32}</p>
                <p><b>- {translates.p33}:</b> {translates.p34}</p>

                <li className="list-group-item privacy-list-item"><b> {translates.p35}</b></li>
                <p><b>- {translates.p36}:</b> {translates.p37}</p>
                <p>- {translates.p38}.</p>
                <p><b>- {translates.p39}:</b></p>
                <p>{translates.p40}</p>
                <p><b>- {translates.p41}:</b> {translates.p42}</p>

                <li className="list-group-item privacy-list-item"><b>{translates.p43}</b></li>
                <p><b>- {translates.p44}:</b> {translates.p45}</p>
                <p><b>- {translates.p46}:</b> {translates.p47}</p>
                <p><b>- {translates.p48}:</b> {translates.p49}</p>
                <p><b>- {translates.p50}:</b> {translates.p51}</p>

                <li className="list-group-item privacy-list-item">{translates.p52}</li>
            </ul>
        </div>
    );
};

export default PrivacyPolicy;
