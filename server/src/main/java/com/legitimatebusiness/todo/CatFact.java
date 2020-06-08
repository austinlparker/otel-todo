package com.legitimatebusiness.todo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CatFact {
  private String text;

  /* an error occurs while this is commented out!
  public CatFact() {
    super();
  }
  */

  public CatFact(String text) {
    this.text = text;
  }

  public String getText() {
    return text;
  }
}