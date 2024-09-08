import Express, {Router} from "express";
import { registerUser } from "../utils/usersMethods";
import { mainPassport } from "../utils/passportConfig";

const router = Router();

interface reqUser extends Express.Request {
    user?: {
        name: string,
        last_name: string,
        avatar: string | null,
        email: string,
        password: string,
        created_at: Date
    }
}

router.use((req, res, next) => {
    res.setHeader('X-Custom-Header', 'MyValue');
    res.setHeader('Access-Control-Allow-Origin', 'https://9000-idx-to-do-1725588050425.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next();
  });
  

router.get("/", (req: reqUser, res) => {
    if(!req.user) return res.status(401).send("Unauthorized");
    const payload = {
        name: req.user.name,
        last_name: req.user.last_name,
        avatar: req.user.avatar,
        email: req.user.email,
        created_at: req.user.created_at
    }
    return res.status(200).json(payload);
});

router.post("/register", async function (req, res, next) {
    mainPassport.authenticate("local_register", ((err: any, user: boolean, _info) => {
        console.log(err);
        // Handle local-register strategy errors.
        if(err) {
            switch (err) {
                case "email-in-use":
                    res.status(409).send("email-in-use");
                    break;
                case "invalid-credentials":
                    res.status(400).send("invalid-credentials");
                    break;
                case "internal-server-error":
                    res.status(500).send("Internal Server Error.");
                    break;
                default:
                    res.status(500).send("Internal Server Error.");
                    break;
            }
        }

        // Verify if the user has been successfully created.
        if(user) {
            return res.status(201).send("success!");
        }

    }))(req, res, next);
});


router.post("/login", async (req, res, next) => {
    mainPassport.authenticate("local_login", function(err: any, user: Express.Request["user"], _info) {
        if(err) {
            switch (err) {
                case "user-not-found":
                    res.status(404).send("user-not-found");
                    break;
                case "invalid-credentials":
                    res.status(400).send("invalid-credentials");
                    break;
                default:
                    res.status(500).send("Internal Server Error.");
                    break;
            }
        }

        if(user) {
            console.log(user);
            return res.status(200).send("success_login!");
        }
    })(req, res, next);
});

export {router as userRouter};
