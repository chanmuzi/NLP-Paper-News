📜: Paper link
🧑🏻‍💻: Developer blog & Github link
🗞️: News

---
# 2024
## ☃ February
<details>
  <summary>1st ~ 3rd week</summary>

- 📜 [Cohere] [Aya Model: An Instruction Finetuned Open-Access Multilingual Language Model](https://arxiv.org/abs/2402.07827)
    - 119개국, 3,000여 명의 연구자가 참여한 다국어 모델 연구 프로젝트의 결과물. 데이터셋도 오픈소스로 제공 (513M 개 instruction fine-tuning 데이터셋)
- 📜 [OS-Copilot: Towards Generalist Computer Agents with Self-Improvement](https://arxiv.org/abs/2402.07456)
- 🧑🏻‍💻 [OpenAI] [Memory and new controls for ChatGPT](https://openai.com/blog/memory-and-new-controls-for-chatgpt)
    - ChatGPT를 이용할 때 과거의 채팅 내역을 현재 채팅에서의 memory로 활용하여 개인 맞춤으로 만들 수 있다. 아직 일부 유저 대상으로 테스트 중인 기능.
- 🧑🏻‍💻 [NVIDIA] [Say What? Chat With RTX Brings Custom Chatbot to NVIDIA RTX AI PCs](https://blogs.nvidia.com/blog/chat-with-rtx-available-now/)
- 🗞️ [Nvidia briefly beats Amazon and nears Alphabet’s market cap amid AI hype](https://aibeat.co/nvidia-briefly-beats-amazon-in-market-value/)
- 🧑🏻‍💻 [DeepLearning.AI] [Serverless LLM apps with Amazon Bedrock](https://www.deeplearning.ai/short-courses/serverless-llm-apps-amazon-bedrock/)
- 📜 [On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks](https://arxiv.org/abs/2402.08115)
- 📜 [Google DeepMind] [Transformers Can Achieve Length Generalization But Not Robustly](https://arxiv.org/abs/2402.09371)
    - 트랜스포머도 제한적으로 입력 길이를 늘릴(extrapolate) 수 있다. (약 2.5배). 하지만 일반화 가능한 세팅은 아님.
- 📜 [Google DeepMind] [Chain-of-Thought Reasoning Without Prompting](https://arxiv.org/abs/2402.10200)
    - 말 그대로 프롬프트 없이 CoT Reasoning을 유도할 수 있다. Decoding process를 조정함
- 🧑🏻‍💻 [Google] [Our next-generation model: Gemini 1.5](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/)
    - 무려 입력을 1M 토큰으로 받을 수 있다고 주장하는 Gemini 1.5 버전이 등장. 배포 준비는 되었으나 아직 배포하지 않은 것으로 알려짐.
- 🧑🏻‍💻 [OpenAI] [Sora: Creating video from text](https://openai.com/sora)
    - OpenAI에서 만든 최초의 Text-to-Video 모델. 입이 떡 벌어질 정도의 성능으로 여러 커뮤니티에서 화제를 불러일으키는 중.
- 📜 [Apple] [Guiding Instruction-based Image Editing via Multimodal Large Language Models](https://arxiv.org/abs/2309.17102)
    - 이미지 편집에 있어서 전문적인 지식 없이 텍스트만을 이용하는데 그 결과물이 아주 뛰어남. ICLR’24 Spotlight 논문.
- 📜 [Using Counterfactual Tasks to Evaluate the Generality of Analogical Reasoning in Large Language Models](https://arxiv.org/abs/2402.08955)
- 🗞️ [Slack AI is here, letting you catch up on lengthy threads and unread messages](https://www.theverge.com/2024/2/14/24070590/slack-ai-launch-thread-summaries-search-recap)
    - 읽지 않은 스레드 요약 기능. 아직 UK & US에서만 이용 가능
- 📜 [Google DeepMind & Research] [A Human-Inspired Reading Agent with Gist Memory of Very Long Contexts](https://arxiv.org/abs/2402.09727)
    - [gist memories]에 에피소드를 저장하여 ReadAgent가 task와 관련 있는 정보를 빠르게 가져오도록 하는 방식. 사람이 긴 글을 읽는 방식에서 착안.
- 📜 [DoRA: Weight-Decomposed Low-Rank Adaptation](https://arxiv.org/abs/2402.09353)
    - LoRA와 FT 사이의 gap을 줄이기 위해 pre-trained weight를 magnitude와 direction으로 분해하는 방법을 도입
- 📜 [Can We Verify Step by Step for Incorrect Answer Detection?](https://arxiv.org/abs/2402.10528)
    - CoT의 각 step에 대해 process discernibility score (PDS)를 구하여 answer-checking baseline을 제공
- 🧑🏻‍💻 [minbpe](https://github.com/karpathy/minbpe)
    - Karpathy가 OpenAI를 퇴사하며 공개한 BPE 코드. 나만의 토크나이저를 만들 수 있다.
- 🧑🏻‍💻 [Meta] [V-JEPA](https://ai.meta.com/research/publications/revisiting-feature-prediction-for-learning-visual-representations-from-video/)
    - 아주 적은 양의 labeled data로 self-supervise한 모델로, 생성형이 아님. 새로운 컨셉 Joint Embedding Predictive Architecture를 제안.
</details>

<details>
  <summary>4th week</summary>
  
- 📜 [Linear Transformers with Learnable Kernel Functions are Better In-Context Models](https://arxiv.org/abs/2402.10644)
  - Transformer 기반의 모델들의 성능을 능가한다고 제안되었던 State Space Models에게 부족한 In-Context Learning 능력을 채워주기 위한 방법을 도입. Taylor Expansion을 활용.
- 📜 [DataDreamer: A Tool for Synthetic Data Generation and Reproducible LLM Workflows](https://arxiv.org/abs/2402.10379)
    - LLM 학습에 활용되는 데이터셋 관련 워크 플로우를 재현 가능하도록 도와주는 프레임워크. 특히 합성 데이터 생성이 포함된 것이 특징.
- 📜 [AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling](https://arxiv.org/abs/2402.12226)
    - 음성, 텍스트, 이미지, 음악을 discrete token으로 입력 받아 autoregressive하게 처리하는 멀티모달 모델. 데이터 수준의 전처리만 필요.
- 📜 [Direct Evaluation of Chain-of-Thought in Multi-hop Reasoning with Knowledge Graphs](https://arxiv.org/abs/2402.11199)
    - Knowledge Graph를 활용하여 올바른 추론 과정을 통해 최종 정답이 도출되었는지 검증
- 📜 [Boosting of Thoughts: Trial-and-Error Problem Solving with Large Language Models](https://arxiv.org/abs/2402.11140)
    - Tree of Thoughts를 반복적으로 trial-and-error 과정에 포함시켜 최종 결과를 도출해내는 방식
- 🗞️ [SoftBank’s Masayoshi Son is reportedly seeking $100B to build a new AI chip venture](https://techcrunch.com/2024/02/19/softbanks-masayoshi-son-is-reportedly-seeking-100b-to-build-a-new-ai-chip-venture/)
    - 소프트뱅크 손정의 회장이 새로운 AI 칩 개발을 위해 133조 규모의 자금을 모집
- 📜 [The FinBen: An Holistic Financial Benchmark for Large Language Models](https://arxiv.org/abs/2402.12659)
    - 금융 도메인 오픈 소스 벤치마크
- 🧑🏻‍💻 [cosmopedia](https://huggingface.co/datasets/HuggingFaceTB/cosmopedia)
    - Mistral-8x7B-Instruct-v0.1에 의해 생성된 textbooks, blogposts, stories, post, WikiHow articles 합성 데이터셋. 30M files, 25B tokens
- 🧑🏻‍💻 [Andrej Karphathy] [Let’s build the GPT Tokenizer](https://www.youtube.com/watch?v=zduSFxRajkE)
    - 최근 공개한 GPT Tokenizer와 관련해서 카파시가 직접 촬영한 2시간 분량의 강의 영상
- 📜 [Microsoft] [Synthetic Data (Almost) from Scratch: Generalized Instruction Tuning for Language Models](https://arxiv.org/abs/2402.13064)
    - human knowledge와 capability에 관한 taxonomy를 입력으로 받고 이를 decomposition → recombine하여 다앙햔 instruction data를 생성
- 🧑🏻‍💻 [Google DeepMind] [Gemma: Introducing new state-of-the-art open models](https://blog.google/technology/developers/gemma-open-models/)
    - 6T 토큰으로 학습하여 오픈 소스로 공개한 2B, 7B 모델. instruction version도 있음.
- 🧑🏻‍💻 [Kaggle] [Google – AI Assistants for Data Tasks with Gemma](https://www.kaggle.com/competitions/data-assistants-with-gemma/)
    - data science concepts, Python programming, Kaggle solution 등에 대해 답변할 수 있는 Gemma 노트북을 만드는 것이 goal
- 📜 [ARL2: Aligning Retrievers for Black-box Large Language Models via Self-guided Adaptive Relevance Labeling](https://arxiv.org/abs/2402.13542)
    - (1) LLM 스스로 diverse & high-quality training dataset을 구축 → (2) relevance supervision을 바탕으로 retriever를 학습 → (3) augmented evidence를 바탕으로 답변을 생성
- 📜 [Making Reasoning Matter: Measuring and Improving Faithfulness of Chain-of-Thought Reasoning](https://arxiv.org/abs/2402.13950)
    - small-sized LM이 올바른 reasoning step을 생성할 수 있도록 하는 프레임워크 FRODO를 제안. 이는 inference module과 reasoning module로 구성됨
- 🧑🏻‍💻 [Aria Everyday Activities Dataset](https://huggingface.co/papers/2402.13349)
    - 143일 간의 활동을 담은 3D 오픈소스 데이터셋
- 📜 [Microsoft Research] [LongRoPE: Extending LLM Context Window Beyond 2 Million Tokens](https://arxiv.org/abs/2402.13753)
    - 256k training length로 1k fine-tuning step 적용 가능 → 2048k 토큰까지 커버. 두 가지 형태의 non-uniformities in positional interpolation & second positional interpolation & 8k 길이의 short context를 커버할 수 있도록 readjust
- 📜 [Yonsei University] [KMMLU: Measuring Massive Multitask Language Understanding in Korean](https://arxiv.org/abs/2402.11548)
    - 45개의 주제를 아우르는 35,030개의 expert-level multiple-choice questions. human performance는 62.6%로 GPT-4, HyperCLOVA X는 각각 59.95%, 53.40%의 성능을 보임
- 📜 [OpenCodeInterpreter: Integrating Code Generation with Execution and Refinement](https://arxiv.org/abs/2402.14658)
    - Code-Feedback (iterative refinement) 테크닉 적용, 68K multi-turn interactions 데이터셋, GPT-4 인터프리터와 같은 모델을 오픈 소스로 공개
- 🗞️ [Adobe Acrobat adds generative AI to ‘easily chat with documents’](https://www.theverge.com/2024/2/20/24077217/adobe-acrobat-generative-ai-assistant-chatbot-pdf-document)
    - AI Assistant in Acrobat (conversational engine)
- 📜 [Hint-before-Solving Prompting: Guiding LLMs to Effectively Utilize Encoded Knowledge](https://arxiv.org/abs/2402.14310)
    - Reasoning tasks에서 문제를 풀기 전에 hint를 제공하는 prompting 방식으로 더 좋은 퍼포먼스를 이끌어냄
- 📜 [CriticBench: Benchmarking LLMs for Critique-Correct Reasoning](https://arxiv.org/abs/2402.14809)
    - LLM의 critique and rectify their reasoning 능력을 평가할 수 있는 15개의 데이터셋으로 구성
- 📜 [YOLOv9: Learning What You Want to Learn Using Programmable Gradient Information](https://arxiv.org/abs/2402.13616)
- 🧑🏻‍💻 [Stability.ai] [Stable Diffusion 3](https://stability.ai/news/stable-diffusion-3?utm_source=www.theaivalley.com)
</details>

<details>
  <summary>5th week</summary>
  
- 📜 [UC Berkely] [LoRA+: Efficient Low Rank Adaptation of Large Models](https://arxiv.org/abs/2402.12354)
    - 기존 LoRA가 suboptimal하다는 문제점을 지적하며 성능을 1~2% 개선함과 동시에 속도는 최대 2배까지 향상시킨 adaptation 기법을 제시
- 📜 [OlympiadBench: A Challenging Benchmark for Promoting AGI with Olympiad-Level Bilingual Multimodal Scientific Problems](https://arxiv.org/abs/2402.14008)
    - 올림피아드 수준의 과학 문제로 구성된 벤치마크. 8,952개의 수학 및 물리 문제로 구성되어 있으며 전문가 수준의 step-by-step reasoning annotation을 포함
- 📜 [Large Language Models for Data Annotation: A Survey](https://arxiv.org/abs/2402.13446)
    - LLM을 annotation에 활용한 학습 기법이나 방법론에 대한 서베이 페이퍼
- 📜 [Purifying Large Language Models by Ensembling a Small Language Model](https://arxiv.org/abs/2402.14845)
    - 언어 모델 학습에 사용된 민감한 정보들이나 data poisioning 관련 이슈 등을 처리하는 방법론으로 SLM ensemeble을 제시
- 📜 [Distillation Contrastive Decoding: Improving LLMs Reasoning with Contrastive Decoding and Distillation](https://arxiv.org/abs/2402.14874)
    - expert & amateur 모델을 필요로 하는 Contrastive Decoding 방식의 한계를 극복하기 위해 dropout과 quantization을 적용
- 📜 [tinyBenchmarks: evaluating LLMs with fewer examples](https://arxiv.org/abs/2402.14992)
    - 현존하는 벤치마크 데이터셋은 지나치게 많은 케이스를 포함하고 있다. 이와 동일한 수준의 평가가 가능한 소수의 examples를 curate.
- 🧑🏻‍💻 [Google DeepMind] 🧞 [Genie: Generative Interactive Environments](https://sites.google.com/view/genie-2024)
    - single image prompt로 게임 만들기..
- 🧑🏻‍💻 [Mistral AI] [Le Chat Mistral](https://chat.mistral.ai/chat)
    - Mistral에서 제공하는 챗봇 서비스
- 🧑🏻‍💻 [Mitral AI] [Au Large](https://mistral.ai/news/mistral-large/)
    - Mistral에서 출시한 새로운 플래그십 모델. GPT-4의 뒤를 잇는 수준의 성능이며 API를 통해 이용 가능 (Le Plateforme, Azure, Self-deployment)
- 📜 [Microsoft Research] 🐳 [Orca-Math: Unlocking the potential of SLMs in Grade School Math](https://arxiv.org/abs/2402.14830)
    - Mistral-7B 모델을 베이스로 학습한 7B 모델 Orca-Math. 200K 개의 고품질 합성 데이터, feedback을 통합시키는 학습 방식 등이 활용됨. Llama-2-70B, ChatGPT-3.5 등을 능가하는 퍼포먼스
- 🧑🏻‍💻 [Argilla] [OpenHermesPreferences - a dataset of 1M AI preferences for RLAIF and DPO](https://huggingface.co/datasets/argilla/OpenHermesPreferences)
    - Mixtral-8x7B-Instruct-v0.1, Nous-Hermes-2-Yi-34B, PairRM 등으로부터 획득한 1M 개의 AI preferences 데이터셋. DPO or RLAIF 에 활용 가능
- 📜 [LLMs with Chain-of-Thought Are Non-Causal Reasoners](https://arxiv.org/abs/2402.16048)
    - CoT는 올바르지만 정답을 도출하지 못한 케이스, 그리고 그 반대의 케이스들에 대한 분석
- 📜 [Look Before You Leap: Problem Elaboration Prompting Improves Mathematical Reasoning in Large Language Models](https://arxiv.org/abs/2402.15764)
    - 복잡한 추론 태스크에 대해서 problem context를 분해 및 설명함으로써 문제 해결 능력을 향상 시킴 (Problem Elaboration Prompting, PEP)
- 🗞️ [Apple cancels work on electric car, shifts team to generative AI](https://economictimes.indiatimes.com/tech/technology/apple-cancels-work-on-electric-car-shifts-team-to-generative-ai/articleshow/108052606.cms)
    - 애플이 더이상 전기차를 만들지 않고 생성형 AI 개발에 집중한다는 소식
- 📜 [Reasoning in Conversation: Solving Subjective Tasks through Dialogue Simulation for Large Language Models](https://arxiv.org/abs/2402.17226)
    - LLM이 주관적인 태스크를 처리할 때는 객관적인 태스크를 처리할 때에 비해 열등한 성능을 보임. 이를 해결하기 위한 방법으로 CoT와 같은 rationale 제시 방식 대신 dialogue를 도입.
- 🧑🏻‍💻 [DeepLearning.AI] [Prompt Engineering with Llama 2](https://www.deeplearning.ai/short-courses/prompt-engineering-with-llama-2/)
    - Meta의 Llama 2를 활용하여 few-shot prompting과 같은 prompt engineering에 대해 학습
</details>


## 🌱 March
<details>
  <summary>1st ~ 2nd week</summary>
  
- 🧑🏻‍💻 OpenAI API’s change on log probabilities from 5 to 20 return
- 🗞️ [Robotics startup Figure raises $675 mln from Microsoft, Nvidia, OpenAI](https://www.reuters.com/technology/robotics-startup-figure-raises-675-mln-microsoft-nvidia-other-big-techs-2024-02-29/)
    - IT 공룡 기업들이 로봇 분야에도 적극적으로 투자하고 있다는 소식
- 📜 [IIT] [How to think step-by-step: A mechanistic understanding of chain-of-thought reasoning](https://arxiv.org/abs/2402.18312)
    - CoT에 대해 layer별로 분석. token representation을 확인한 결과 중간 이전의 layer에서는 사전 학습데이터에 대해 편향되어 있으나 중간 이후부터는 급격히 in-context에 집중
- 📜 [Rice University] [Learning to Compress Prompt in Natural Language Formats](https://arxiv.org/abs/2402.18700)
    - API에 대해서는 soft prompt compression을 적용할 수 없기 때문에 자연어 형태로 compression하는 방법을 제시. 여기에 사용되는 것이 Natrual Language Prompt Encapsulation (Nano-Capsulator) framework.
</details>
