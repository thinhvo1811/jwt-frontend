import jwtDefinitionImg from '../../assets/img/jwt-definition.png';
import jwtWorkFlowImg from '../../assets/img/workflow_jwt.png';
import './Home.scss';

const Home = () => {
    return (
        <div className="home-container">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h4>What is JSON Web Token?</h4>
                        <div className="content mt-4">
                            <p>
                                JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and
                                self-contained way for securely transmitting information between parties as a JSON
                                object. This information can be verified and trusted because it is digitally signed.
                                JWTs can be signed using a secret (with the <b>HMAC</b> algorithm) or a public/private
                                key pair using <b>RSA</b> or <b>ECDSA</b>.
                            </p>
                            <p>
                                Although JWTs can be encrypted to also provide secrecy between parties, we will focus on
                                signed tokens. Signed tokens can verify the integrity of the claims contained within it,
                                while encrypted tokens hide those claims from other parties. When tokens are signed
                                using public/private key pairs, the signature also certifies that only the party holding
                                the private key is the one that signed it.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <img className="jwt-definition-img" src={jwtDefinitionImg} alt="" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 col-md-6">
                        <img className="jwt-workflow-img" src={jwtWorkFlowImg} alt="" />
                    </div>
                    <div className="col-12 col-md-6">
                        <h4>When should you use JSON Web Tokens?</h4>
                        <div className="content mt-4">
                            <p>Here are some scenarios where JSON Web Tokens are useful:</p>
                            <ul>
                                <li>
                                    <b>Authorization</b>: This is the most common scenario for using JWT. Once the user
                                    is logged in, each subsequent request will include the JWT, allowing the user to
                                    access routes, services, and resources that are permitted with that token. Single
                                    Sign On is a feature that widely uses JWT nowadays, because of its small overhead
                                    and its ability to be easily used across different domains
                                </li>
                                <li>
                                    <b>Information Exchange</b>: JSON Web Tokens are a good way of securely transmitting
                                    information between parties. Because JWTs can be signed—for example, using
                                    public/private key pairs—you can be sure the senders are who they say they are.
                                    Additionally, as the signature is calculated using the header and the payload, you
                                    can also verify that the content hasn't been tampered with.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
