"""
@misc{g2pE2019,
  author = {Park, Kyubyong & Kim, Jongseok},
  title = {g2pE},
  year = {2019},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {url{https://github.com/Kyubyong/g2p}}
}
"""

from g2p_en import G2p 
texts = ["Hello", "Hullo"]
g2p = G2p()
for text in texts:
    out = g2p(text)
    print("--------")
    print(out)
